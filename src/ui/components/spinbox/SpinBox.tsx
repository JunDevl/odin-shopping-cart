import "./spinbox.css"

import { useRef, useState, useEffect, type HTMLProps } from "react";

type Props = Omit<HTMLProps<HTMLInputElement>, "type" | "value" | "onInput"> &
  {
    onValueChange: (newValue: number) => void,
    changeInterval?: number // ms
  }

const SpinBox = ({className, onValueChange, changeInterval, ...narrowedProps}: Props) => {
  const [inputValue, setInputValue] = useState(0);

  type UnaryOperator = "increment" | "decrement";
  const [unaryOperator, setUnaryOperator] = useState<UnaryOperator | null>(null);

  const minimumValue = isNaN(+narrowedProps.min!) ? undefined : +narrowedProps.min!;
  const maximumValue = isNaN(+narrowedProps.max!) ? undefined : +narrowedProps.max!;

  const input = useRef<HTMLInputElement>(null);

  const valueIsLegal = (value: number): boolean => {
    if (minimumValue === undefined && maximumValue === undefined) return true;

    console.log(Boolean(value >= minimumValue!));
    if ((value >= minimumValue!) || 
        (value <= maximumValue!)) return true;

    return false;
  };

  const initUpdateInterval = (operator: UnaryOperator) => {
    const intervalID = setInterval(() => {
      if (operator === "decrement") setInputValue(prev => valueIsLegal(prev - 1) ? prev - 1 : prev);
      if (operator === "increment") setInputValue(prev => valueIsLegal(prev + 1) ? prev + 1 : prev);
    }, changeInterval ?? 250);

    return intervalID;
  }
  
  useEffect(() => onValueChange(inputValue), [inputValue]);

  useEffect(() => {
    if (!unaryOperator) return;

    const interval = initUpdateInterval(unaryOperator);
    
    return () => clearInterval(interval);
  }, [unaryOperator]);
  
  return (
    <div className="input-wrapper">
      <button 
        className="decrement"
        onMouseDown={() => {
          setInputValue(prev => valueIsLegal(prev - 1) ? prev - 1 : prev);
          setUnaryOperator("decrement");
        }}
        onMouseUp={() => setUnaryOperator(null)}
      >
        &#8722;
      </button>
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
      <button 
        className="increment" 
        onMouseDown={() => {
          setInputValue(prev => valueIsLegal(prev + 1) ? prev + 1 : prev);
          setUnaryOperator("increment");
        }}
        onMouseUp={() => setUnaryOperator(null)}  
      >
        &#43;
      </button>
    </div>
  )
}

export default SpinBox