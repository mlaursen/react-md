import * as React from "react";
import { ResizeListener } from "@react-md/listeners";

const ResizeListenerUsingChildrenCallback = () => (
  <ResizeListener>
    {() => {
      let height = 0;
      let width = 0;
      if (typeof window !== "undefined") {
        ({ innerHeight: height, innerWidth: width } = window);
      }

      return (
        <table>
          <tbody>
            <tr>
              <th scope="row">height:</th>
              <td>{height}</td>
            </tr>
            <tr>
              <th scope="row">width:</th>
              <td>{width}</td>
            </tr>
          </tbody>
        </table>
      );
    }}
  </ResizeListener>
);

export default ResizeListenerUsingChildrenCallback;
