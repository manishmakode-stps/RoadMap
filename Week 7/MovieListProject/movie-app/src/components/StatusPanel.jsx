const StatusPanel = ({ tone = 'default', children }) => (
  <section className={`status-panel${tone !== 'default' ? ` ${tone}-panel` : ''}`}>
    {children}
  </section>
);

export default StatusPanel;
