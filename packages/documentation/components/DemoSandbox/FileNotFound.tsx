import React, { FC } from "react";
import { Text, TextContainer } from "@react-md/typography";
import { List, ListItem } from "@react-md/list";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { bem } from "@react-md/theme";
import Code from "components/Code/Code";
import { Card, CardHeader, CardTitle, CardContent } from "@react-md/card";

export interface FileNotFoundProps {
  fileName: string;
  sandbox: IFiles | null;
  offset: boolean;
  onFileChange: (fileName: string) => void;
}

const block = bem("sandbox-modal");
const FileNotFound: FC<FileNotFoundProps> = ({
  offset,
  fileName,
  onFileChange,
  sandbox,
}) => {
  return (
    <div className={block("error", { offset })}>
      <TextContainer>
        <Text color="theme-error" type="headline-4">
          Unable to find a file with a file name of: <Code>{fileName}</Code>
        </Text>
        {sandbox && (
          <Card>
            <CardHeader>
              <CardTitle>Did you mean one of:</CardTitle>
            </CardHeader>
            <CardContent>
              <List className={block("error-list")}>
                {Object.keys(sandbox).map(name => (
                  <ListItem key={name} onClick={() => onFileChange(name)}>
                    {name}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </TextContainer>
    </div>
  );
};

export default FileNotFound;
