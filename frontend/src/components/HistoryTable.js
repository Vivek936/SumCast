// src/components/HistoryTable.js
// ✅ Saare results ki table

const HistoryTable = ({ results }) => {

  const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="history-section">
      <h2>📋 History ({results.length} records)</h2>

      <table className="history-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Client 1</th>
            <th>Client 2</th>
            <th>Client 3</th>
            <th>Calculation</th>
            <th>Sum</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr key={item._id}>

              {/* Serial number — latest pehle */}
              <td className="serial">{index + 1}</td>

              {/* Teen client values */}
              <td>{item.clientValues[0] ?? '—'}</td>
              <td>{item.clientValues[1] ?? '—'}</td>
              <td>{item.clientValues[2] ?? '—'}</td>

              {/* Calculation string */}
              <td>{item.clientValues.join(' + ')}</td>

              {/* Sum badge */}
              <td>
                <span className="sum-badge">= {item.sum}</span>
              </td>

              {/* Timestamp */}
              <td>{formatDate(item.timestamp)}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;