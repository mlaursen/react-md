import {
  Button,
  Card,
  CardHeader,
  nanoid,
  randomInt,
  SkeletonPlaceholder,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { loremIpsum } from "src/utils/loremIpsum";
import { randomDate } from "src/utils/randomDate";

import styles from "./PrerenderingLayout.module.scss";

interface Data {
  id: string;
  name: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
}

function ItemRow({
  id,
  index,
  name,
  createdBy,
  createdOn,
  modifiedBy,
  modifiedOn,
}: Partial<Data> & { index: number }): ReactElement {
  const loading =
    !name && !createdBy && !createdOn && !modifiedBy && !modifiedOn;

  if (loading && index % 3 === 0) {
    return (
      <TableRow disableHover>
        <TableCell colSpan={6}>
          <SkeletonPlaceholder width="100%" />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow disableHover={loading}>
      <TableCell>
        <SkeletonPlaceholder disabled={!loading}>{id}</SkeletonPlaceholder>
      </TableCell>
      <TableCell>
        <SkeletonPlaceholder disabled={!loading}>{name}</SkeletonPlaceholder>
      </TableCell>
      <TableCell>
        <SkeletonPlaceholder disabled={!loading}>
          {createdBy}
        </SkeletonPlaceholder>
      </TableCell>
      <TableCell>
        <SkeletonPlaceholder disabled={!loading}>
          {createdOn}
        </SkeletonPlaceholder>
      </TableCell>
      <TableCell>
        <SkeletonPlaceholder disabled={!loading}>
          {modifiedBy}
        </SkeletonPlaceholder>
      </TableCell>
      <TableCell>
        <SkeletonPlaceholder disabled={!loading}>
          {modifiedOn}
        </SkeletonPlaceholder>
      </TableCell>
    </TableRow>
  );
}

export function PrerenderingLayout(): ReactElement {
  const [data, setData] = useState<Data[] | undefined>([]);
  useEffect(() => {
    if (data) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const length = randomInt({ min: 3, max: 30 });
      const data = Array.from<unknown, Data>({ length }, () => {
        const createdOn = randomDate(new Date(2020, 0, 1));
        return {
          id: nanoid(),
          name: loremIpsum({ minWords: 2, maxWords: 5 }),
          createdOn: createdOn.toLocaleString(),
          createdBy: loremIpsum({ words: 2 }),
          modifiedBy: loremIpsum({ words: 2 }),
          modifiedOn: randomDate(createdOn).toLocaleString(),
        };
      });

      setData(data);
    }, 4000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [data]);

  const items = useMemo(() => {
    if (data) {
      return data;
    }

    const length = randomInt({ min: 2, max: 8 });
    return Array.from({ length }, (_, i) => ({ id: `placeholder-${i}` }));
  }, [data]);

  return (
    <Card fullWidth className={styles.card}>
      <CardHeader>
        <Button theme="secondary" onClick={() => setData(undefined)}>
          Load Data
        </Button>
      </CardHeader>
      <TableContainer className={styles.container}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell grow>name</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Modified By</TableCell>
              <TableCell>Modified On</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <ItemRow key={item.id} {...item} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
