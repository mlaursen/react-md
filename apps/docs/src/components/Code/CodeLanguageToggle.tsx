"use client";
import {
  CODE_LANGUAGES,
  useCodeLanguageContext,
} from "@/providers/CodeLanguageProvider.jsx";
import { Box, Button } from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./CodeLanguageToggle.module.scss";

export function CodeLanguageToggle(): ReactElement {
  const { codeLanguage, setCodeLanguage } = useCodeLanguageContext();

  return (
    <Box className={styles.container} disablePadding>
      {CODE_LANGUAGES.map((lang) => {
        const selected = codeLanguage === lang;

        return (
          <Button
            key={lang}
            onClick={() => setCodeLanguage(lang)}
            buttonType="icon-square"
            theme={selected ? "primary" : "clear"}
            themeType={selected ? "contained" : "outline"}
            className={styles.button}
          >
            {lang.toUpperCase()}
          </Button>
        );
      })}
    </Box>
  );
}
