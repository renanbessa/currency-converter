import PropTypes from 'prop-types';

const CurrencyRowPropTypes = {
  rates: PropTypes.array.isRequired,
  selectedCurrency: PropTypes.string,
  onChangeCurrency: PropTypes.func.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
};

export const CurrencyRow = (props) => {
  const { rates, selectedCurrency, onChangeCurrency, onChangeAmount, amount } = props;
  console.log(amount);

  return (
    <div>
      <input type="text" className="input" value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {rates.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

CurrencyRow.propTypes = CurrencyRowPropTypes;
