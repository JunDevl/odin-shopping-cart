import "./spinbox.css"

import { useRef, useState, useEffect, type HTMLProps } from "react";

type Props = Omit<HTMLProps<HTMLInputElement>, "type" | "value" | "onInput"> &
  {
    onValueChange: (newValue: number) => void,
    changeInterval?: number // ms
  }

const SpinBox = ({className, onValueChange, changeInterval, ...narrowedProps}: Props) => {
  const [inputValue, setInputValue] = useState(0);

  type UnaryOperation = {
    operator: "increment" | "decrement"
    accumulator: number
  }
  const [unaryOperation, setUnaryOperation] = useState<UnaryOperation | null>(null);

  const minimumValue = isNaN(+narrowedProps.min!) ? undefined : +narrowedProps.min!;
  const maximumValue = isNaN(+narrowedProps.max!) ? undefined : +narrowedProps.max!;

  const input = useRef<HTMLInputElement>(null);

  const valueIsLegal = (value: number): boolean => {
    if (!minimumValue && !maximumValue) return true;

    if ((minimumValue && value >= minimumValue) || 
        (maximumValue && value <= maximumValue)) return true;

    return false;
  };

  const initValueChangeTimeout = () => {
    const timeoutID = setTimeout(() => {
      if (unaryOperation) {
        const {operator} = unaryOperation;
        if (operator === "decrement") setInputValue(prev => valueIsLegal(prev--) ? prev-- : prev);
        if (operator === "increment") setInputValue(prev => valueIsLegal(prev++) ? prev++ : prev);
      }
      clearTimeout(timeoutID);
    }, changeInterval ?? 500);
  }
  
  useEffect(() => onValueChange(inputValue), [inputValue]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (unaryOperation) {
        const {operator, accumulator} = unaryOperation;
        if (operator === "decrement") setInputValue(prev => valueIsLegal(prev - accumulator) ? prev - accumulator : prev);
        if (operator === "increment") setInputValue(prev => valueIsLegal(prev + accumulator) ? prev + accumulator : prev);
        setUnaryOperation({
          operator: unaryOperation.operator,
          accumulator: unaryOperation.accumulator + 1
        })
      }
      clearTimeout(timeoutID);
    }, changeInterval ?? 500);

    if (unaryOperation === null) {
      clearTimeout(timeoutID)
      return;
    }

    return () => clearTimeout(timeoutID);
  }, [unaryOperation]);
  
  return (
    <div className="input-wrapper">
      <div 
        className="decrement" 
        onMouseDown={() => {
          setInputValue(prev => valueIsLegal(prev--) ? prev-- : prev);
          setUnaryOperation({
            operator: "decrement",
            accumulator: 1
          });
        }}
        onMouseUp={() => setUnaryOperation(null)}
      >
        &#8722;
      </div>
      <input 
        {...narrowedProps}
        type="number"
        value={inputValue}
        onInput={() => {
          const value = parseInt(input.current?.value ?? "0");

          if (!valueIsLegal(value)) return;

          setInputValue(value);
        }}
        ref={input}
        className={`${className ? `${className }` : ""}spinbox`}
      />
      <div 
        className="increment" 
        onMouseDown={() => {
          setInputValue(prev => valueIsLegal(prev++) ? prev++ : prev);
          setUnaryOperation({
            operator: "increment",
            accumulator: 1
          });
        }}
        onMouseUp={() => setUnaryOperation(null)}  
      >
        &#43;
      </div>
    </div>
  )
}

export default SpinBox