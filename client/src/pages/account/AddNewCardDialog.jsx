import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SecondaryButton from '../../components/shares/SecondaryButton';
import OutlineButton from '../../components/shares/OutlineButton';

const AddNewCardDialog = ({ isOpen, onClose, onSave, cardData }) => {
  const [number, setNumber] = useState('');
  const [bank, setBank] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const bankOptions = [
    'Vietcombank',
    'Techcombank',
    'ACB',
    'Sacombank',
    'TPBank',
    'VPBank',
    'BIDV',
    'VietinBank',
    'MB Bank',
    'Agribank',
  ];

  useEffect(() => {
    if (cardData) {
      setNumber(cardData.number || '');
      setBank(cardData.bank || '');
      setIsDefault(cardData.isDefault || false);
    } else {
      setNumber('');
      setBank('');
      setIsDefault(false);
    }
  }, [cardData, isOpen]);

  const handleSave = () => {
    if (!number || !bank) {
      alert('Please fill in all fields.');
      return;
    }

    const newCard = {
      number,
      bank,
      isDefault,
    };
    onSave(newCard);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold text-[#FFA50B] mb-4">
          {cardData ? 'Edit Bank Card' : 'Add New Bank Card'}
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Account Number</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-100 rounded outline-none"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Select Bank</label>
          <select
            className="w-full p-2 bg-gray-100 rounded outline-none"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >
            <option value="">-- Select Bank --</option>
            {bankOptions.map((b, index) => (
              <option key={index} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4"
            />
            Set as default
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton title="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

AddNewCardDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  cardData: PropTypes.object,
};

export default AddNewCardDialog;