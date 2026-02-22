import { Row, IconButton, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
        </Text>
        <Row gap="16">
          {social.map(
            (item) =>
              item.link && (
                <span key={item.name} className={styles.socialIcon}>
                  <IconButton
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="s"
                    variant="ghost"
                  />
                </span>
              ),
          )}
        </Row>
      </Row>
      <Row fillWidth horizontal="center" paddingBottom="8">
        <Text variant="body-default-xs" onBackground="neutral-weak" style={{ opacity: 0.4 }}>
          Made with{" "}
          <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
        </Text>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
