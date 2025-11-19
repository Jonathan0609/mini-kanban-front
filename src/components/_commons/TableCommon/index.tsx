"use client";

import {
  Box,
  Card,
  Center,
  LoadingOverlay,
  Paper,
  Table,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
} from "@mantine/core";
import type { CSSProperties, ReactNode } from "react";

import classes from "./style.module.css";

interface TableColumn<T> {
  key?: keyof T;
  label: string;
  width?: CSSProperties["width"];
  render?: (item: T) => ReactNode;
  align?: "center" | "right" | "left";
}

interface TableCommonProps<G> {
  data?: G[];
  columns: TableColumn<G>[];
  loading?: boolean;
}

export default function TableCommon<T>(props: TableCommonProps<T>) {
  const columns = props.columns;
  const data = props.data;

  return (
    <Card withBorder radius="md" p={0}>
      <TableScrollContainer
        minWidth="max-content"
        className={classes.scrollContainer}
      >
        <Table highlightOnHover w="100%">
          <TableThead>
            <TableTr>
              {columns.map((column, index) => (
                <TableTh key={index.toString()}>
                  <Text fw={600} fz="sm" ta={column.align}>
                    {column.label}
                  </Text>
                </TableTh>
              ))}
            </TableTr>
          </TableThead>

          <TableTbody pos="relative">
            {!!data &&
              data.map((row, index) => (
                <TableTr key={index.toString()} style={{ height: 60 }}>
                  {columns.map((column, index) => (
                    <TableTd
                      key={index.toString()}
                      style={{
                        width: column.width,
                        lineClamp: 1,
                        textAlign: column.align,
                        fontWeight: 500,
                      }}
                    >
                      {!column.render ? (
                        <Text fz="sm">
                          {row[column.key as keyof typeof row] as string}
                        </Text>
                      ) : (
                        column.render(row)
                      )}
                    </TableTd>
                  ))}
                </TableTr>
              ))}

            {!data?.length && (
              <TableTr style={{ height: 60 }}>
                <TableTd>
                  <Paper p="lg" withBorder>
                    <Center>Não há dados</Center>
                  </Paper>
                </TableTd>
              </TableTr>
            )}
          </TableTbody>
        </Table>
      </TableScrollContainer>
    </Card>
  );
}
