import classes from "./transaction.module.scss";

export default function TransactionList(props) {
  return (
    <div className={classes.container}>
      <div className={classes.insideContainer}>
        <table className={classes.headBar}>
          <tbody>
            <tr>
              {props.heads.map((e, i) => {
                return (
                  <td key={i}>
                    <span>{e}</span>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <div className={classes.kuyDiv}>
          <table className={classes.contents}>
            <tbody>
              {props.data.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className={i % 2 == 0 ? classes.unColour : classes.colour}
                  >
                    <td>
                      <span>{e[Object.keys(e)[0]]}</span>
                    </td>
                    <td>
                      <span>{e[Object.keys(e)[1]]}</span>
                    </td>
                    <td>
                      <span>{e[Object.keys(e)[2]]}</span>
                    </td>
                    <td>
                      <span>{e[Object.keys(e)[3]]}</span>
                    </td>
                    <td>
                      <span>{e[Object.keys(e)[4]]} </span>
                    </td>
                    <td>
                      <span>
                        {e[Object.keys(e)[5]] == ""
                          ? "null"
                          : e[Object.keys(e)[5]]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
