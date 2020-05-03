import React from "react";
import Table from "@material-ui/core/Table";
import { TableHead, TableCell } from "@material-ui/core";
import { TableRow, TableBody } from "@material-ui/core";

export default function MessageList({ state }) {
  return (
    <Table stickyHeader padding="none">
      <TableHead>
        <TableRow>
          <TableCell style={{ width: 120 }}>Date</TableCell>
          <TableCell style={{ width: 300 }}>From</TableCell>
          <TableCell style={{ width: 300 }}>To</TableCell>
          <TableCell>Subject</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {state.messages.map((message) => ( 
          <TableRow key={message.id} onClick={() => state.showMessage(message)}>
            <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
            <TableCell>{message.from}</TableCell>
             <TableCell>{message.to}</TableCell>
            <TableCell>{message.subject}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
