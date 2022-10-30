import "./widgetLg.css";
import { useState } from "react";

export default function WidgetLg(props) {
  const [myData, setMyData] = useState(props.data);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Transfer to</th>
            <th className="widgetLgTh">Date and time</th>
            <th className="widgetLgTh">Value</th>
            <th className="widgetLgTh">ID</th>
          </tr>
          {props.data[props.data.length - 1] ? (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">
                  {props.data[props.data.length - 1].fromAccount}
                </span>
              </td>
              <td className="widgetLgDate">
                {props.data[props.data.length - 1].dateAndTime}
              </td>
              <td className="widgetLgAmount">
                {props.data[props.data.length - 1].value}
              </td>
              <td className="widgetLgStatus">
                <Button
                  type={`${props.data[props.data.length - 1].transactionId}`}
                />
              </td>
            </tr>
          ) : null}

          {props.data[props.data.length - 2] ? (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">
                  {props.data[props.data.length - 2].fromAccount}
                </span>
              </td>
              <td className="widgetLgDate">
                {props.data[props.data.length - 2].dateAndTime}
              </td>
              <td className="widgetLgAmount">
                {props.data[props.data.length - 2].value}
              </td>
              <td className="widgetLgStatus">
                <Button
                  type={`${props.data[props.data.length - 2].transactionId}`}
                />
              </td>
            </tr>
          ) : null}
          {props.data[props.data.length - 3] ? (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">
                  {props.data[props.data.length - 3].fromAccount}
                </span>
              </td>
              <td className="widgetLgDate">
                {props.data[props.data.length - 3].dateAndTime}
              </td>
              <td className="widgetLgAmount">
                {props.data[props.data.length - 3].value}
              </td>
              <td className="widgetLgStatus">
                <Button
                  type={`${props.data[props.data.length - 3].transactionId}`}
                />
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
