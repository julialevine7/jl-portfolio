"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Column, Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

const TIMEZONE_STORAGE_KEY = "portfolio-timezone";

function getTimezones(): string[] {
  if (typeof Intl !== "undefined" && "supportedValuesOf" in Intl) {
    return ((Intl as any).supportedValuesOf("timeZone") as string[]).sort();
  }
  return [
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "UTC",
  ];
}

function formatTimezoneLabel(tz: string): string {
  return tz.replace(/_/g, " ").replace(/\//g, " / ");
}

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };
        const timeString = new Intl.DateTimeFormat(locale, options).format(now);
        setCurrentTime(timeString);
      } catch {
        setCurrentTime("--:--:--");
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

const TimezoneAutocomplete: React.FC<{
  value: string;
  onChange: (tz: string) => void;
  timezones: string[];
}> = ({ value, onChange, timezones }) => {
  const [inputValue, setInputValue] = useState(formatTimezoneLabel(value));
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setInputValue(formatTimezoneLabel(value));
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setInputValue(formatTimezoneLabel(value));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  const filterSuggestions = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      const q = query.toLowerCase().replace(/\s+/g, "");
      const matches = timezones.filter((tz) =>
        tz.toLowerCase().replace(/_/g, "").includes(q)
      );
      setSuggestions(matches.slice(0, 8));
    },
    [timezones]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    filterSuggestions(val);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
  };

  const selectTimezone = (tz: string) => {
    onChange(tz);
    setInputValue(formatTimezoneLabel(tz));
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        selectTimezone(suggestions[highlightedIndex]);
      } else if (suggestions.length > 0) {
        selectTimezone(suggestions[0]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setInputValue(formatTimezoneLabel(value));
    }
  };

  const handleFocus = () => {
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
  };

  return (
    <div ref={wrapperRef} className={styles.autocompleteWrapper}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder="Search timezone..."
        className={styles.autocompleteInput}
        spellCheck={false}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul ref={listRef} className={styles.suggestionsList}>
          {suggestions.map((tz, i) => (
            <li
              key={tz}
              className={`${styles.suggestionItem} ${i === highlightedIndex ? styles.suggestionItemHighlighted : ""}`}
              onMouseDown={() => selectTimezone(tz)}
              onMouseEnter={() => setHighlightedIndex(i)}
            >
              {formatTimezoneLabel(tz)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Header = () => {
  const pathname = usePathname() ?? "";
  const timezones = useMemo(getTimezones, []);

  const [selectedTimezone, setSelectedTimezone] = useState<string>(() => {
    if (typeof window === "undefined") return person.location;
    return localStorage.getItem(TIMEZONE_STORAGE_KEY) || person.location;
  });

  useEffect(() => {
    try {
      localStorage.setItem(TIMEZONE_STORAGE_KEY, selectedTimezone);
    } catch {}
  }, [selectedTimezone]);

  const showTimeOrLocation = display.time || display.location;

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {showTimeOrLocation && (
            <Column gap="2" vertical="start" s={{ hide: true }}>
              <TimezoneAutocomplete
                value={selectedTimezone}
                onChange={setSelectedTimezone}
                timezones={timezones}
              />
              {display.time && (
                <Row suppressHydrationWarning>
                  <TimeDisplay timeZone={selectedTimezone} />
                </Row>
              )}
            </Column>
          )}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      label={gallery.label}
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center" paddingRight="12" />
      </Row>
    </>
  );
};
