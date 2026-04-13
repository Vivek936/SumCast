const SumCard = ({ data }) => {

  if (!data) {
    return (
      <div className="no-data">
        <span>📭</span>
        <p>Abhi koi result nahi hai.</p>
        <p>Python server chalao aur 3 clients se numbers bhejo!</p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="sum-card">
      <div className="label">🎯 Latest Result</div>

      {/* Bada Sum Number */}
      <div className="sum-number">{data.sum}</div>

      {/* Client values with + sign */}
      <div className="client-values">
        {data.clientValues.join(' + ')} = {data.sum}
      </div>

      {/* Timestamp */}
      <div className="timestamp">
        🕐 {formatDate(data.timestamp)}
      </div>
    </div>
  );
};

export default SumCard;
