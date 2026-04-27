export default function Dashboard() {
  const tickets = [
    { id: '123', title: 'Website Crash - URGENT', priority: 'HIGH' },
    { id: '124', title: 'Billing Issue', priority: 'MEDIUM' }
  ];

  return (
    <div style={{padding: 40, maxWidth: 1200, margin: '0 auto'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40}}>
        <div>
          <h1 style={{fontSize: 36, fontWeight: 800, margin: 0}}>SupportSphere Dashboard</h1>
          <p style={{color: '#64748b', fontSize: 18}}>Manage your AI-powered support tickets</p>
        </div>
        <button style={{
          padding: '15px 30px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          border: 'none',
          borderRadius: 20,
          fontSize: 16,
          fontWeight: 700
        }}>
          ➕ New Ticket
        </button>
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 25}}>
        {tickets.map(ticket => (
          <div key={ticket.id} style={{
            background: 'white',
            padding: 30,
            borderRadius: 25,
            boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }} onClick={() => window.location.href = `/chat/${ticket.id}`}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20}}>
              <h3 style={{fontSize: 22, fontWeight: 700, margin: 0, color: '#1e293b'}}>
                {ticket.title}
              </h3>
              <span style={{
                padding: '6px 16px',
                background: ticket.priority === 'HIGH' ? '#fef2f2' : '#fefce8',
                color: ticket.priority === 'HIGH' ? '#dc2626' : '#ca8a04',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700
              }}>
                {ticket.priority}
              </span>
            </div>
            <button style={{
              width: '100%',
              padding: '15px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              border: 'none',
              borderRadius: 15,
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              💬 Open AI Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}