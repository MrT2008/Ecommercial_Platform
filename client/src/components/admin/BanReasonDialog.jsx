import PropTypes from 'prop-types';
import { useState } from 'react';
import SecondaryButton from '../shares/SecondaryButton';
import OutlineButton from '../shares/OutlineButton';

const predefinedReasons = [
  'Scam or fraud',
  'Selling prohibited products',
  'Repeated policy violations',
  'Fake reviews or ratings',
  'Other serious violations'
];

const BanReasonDialog = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');

  const handleSubmit = () => {
    if (!selectedReason) return;
    onSubmit(selectedReason);
    setSelectedReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-red-600">Ban Shop</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Ban Reason
          </label>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full p-2 bg-gray-100 rounded border border-gray-200"
          >
            <option value="">-- Choose a reason --</option>
            {predefinedReasons.map((reason, idx) => (
              <option key={idx} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton
            title="Ban"
            onClick={handleSubmit}
            disabled={!selectedReason}
          />
        </div>
      </div>
    </div>
  );
};

BanReasonDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default BanReasonDialog;
