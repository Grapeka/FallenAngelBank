import classes from "./useCardInput.module.scss";
import Button from "@mui/material/Button";

const UseCardInput = (props) => {
  const handleSubmit = (event) => {
    console.log(props.submitValue);
    props.setStep(props.step + 1);
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className={classes.theForm}>
      <div className={classes.inForm}>
        <div>
          <label required htmlFor="fromAccount">
            From card
          </label>
          <select
            name="fromAccount"
            onChange={(event) => {
              console.log(event.target.value);
              props.setSubmitValue({
                ...props.submitValue,
                fromCard: event.target.value,
              });
            }}
            required={true}
          >
            {props.data.map((e, i) => {
              return (
                <option key={i} type="text" value={e.cardId}>
                  {e.cardId}
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
            <option value="Angel Bank">Angel Bank</option>
          </select>
        </div>

        <div>
          <label htmlFor="toAccount">To</label>
          <select
            onChange={(event) =>
              props.setSubmitValue({
                ...props.submitValue,
                toAccount: event.target.value,
              })
            }
            name="toAccount"
          >
            <option style={{ display: "none" }}>
              Select company default: Nike
            </option>
            <option value="12">Nike</option>
            <option value="13">Adidas</option>
          </select>
        </div>

        <div>
          <label htmlFor="valueCredit">Value credit</label>
          <input
            autoComplete="off"
            type="number"
            name="valueCredit"
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
            <option style={{ display: "none" }}>Select category</option>
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

export default UseCardInput;
