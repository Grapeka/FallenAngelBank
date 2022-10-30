import Button from "@mui/material/Button";
import classes from "./userInputTransfer.module.scss";
import Swal from "sweetalert2";

const UserInputTransfer = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const compareAccount = props.submitValue.fromAccount
      ? props.submitValue.fromAccount
      : props.data[0].accountNum;
    const balanceUserHas = props.data.filter(
      (e) => e.accountNum == compareAccount
    );
    if (props.submitValue.value <= balanceUserHas[0].balance) {
      props.setStep(props.step + 1);
    } else {
      props.setSubmitValue({
        fromAccount: null,
        destinationBank: null,
        toAccount: null,
        value: null,
        category: null,
        note: null,
      });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not enough balance in selected account!",
        confirmButtonColor: "darkblue",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className={classes.theForm}>
      <div className={classes.inForm}>
        <div>
          <label required htmlFor="fromAccount">
            From account
          </label>
          <select
            name="fromAccount"
            onChange={(event) => {
              props.setSubmitValue({
                ...props.submitValue,
                fromAccount: event.target.value,
              });
            }}
            required={true}
          >
            {props.data.map((e, i) => {
              return (
                <option key={i} type="text" value={e.accountNum}>
                  {e.accountNum}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label htmlFor="toBank">Destination bank</label>
          <select
            name="toBank"
            onChange={(event) =>
              props.setSubmitValue({
                ...props.submitValue,
                destinationBank: event.target.value,
              })
            }
            required={true}
          >
            <option value="Angel-Bank">Angel Bank</option>
            <option value="Angel-Exchange">Angel Exchange</option>
          </select>
        </div>

        <div>
          <label htmlFor="toAccount">Recipient account no.</label>
          <input
            autoComplete="off"
            type="text"
            name="toAccount"
            placeholder="Enter Recipient account no."
            onChange={(event) =>
              props.setSubmitValue({
                ...props.submitValue,
                toAccount: event.target.value,
              })
            }
            required={true}
          />
        </div>

        <div>
          <label htmlFor="value">Value</label>
          <input
            autoComplete="off"
            type="number"
            name="value"
            onChange={(event) =>
              props.setSubmitValue({
                ...props.submitValue,
                value: event.target.value,
              })
            }
            placeholder="0.00 THB"
            required
          />
        </div>

        <div>
          <label htmlFor="category">Transaction category</label>
          <select
            onChange={(event) =>
              props.setSubmitValue({
                ...props.submitValue,
                category: event.target.value,
              })
            }
            name="category"
          >
            <option value="0" style={{ display: "none" }}>
              Select category
            </option>
            <option value="1">Shopping</option>
            <option value="2">Food & Drinks</option>
            <option value="3">Entertainment</option>
            <option value="4">Family & Personal</option>
            <option value="5">Saving & Investment</option>
            <option value="6">Auto & Transport</option>
            <option value="7">Hotel & Travel</option>
            <option value="8">Gift & Donation</option>
            <option value="9">Bill & Utilities</option>
            <option value="10">Others</option>
          </select>
        </div>

        <div className={classes.note}>
          <label htmlFor="note">Note</label>
          <textarea
            onChange={(event) =>
              props.setSubmitValue({
                ...props.submitValue,
                note: event.target.value,
              })
            }
            type="text"
            name="note"
            value={props.submitValue.note ? props.submitValue.note : ""}
            placeholder="Enter personal note (optional)"
          />
        </div>
      </div>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="secondary"
          style={{ backgroundColor: "darkblue" }}
          type="submit"
        >
          Review
        </Button>
      </div>
    </form>
  );
};

export default UserInputTransfer;
