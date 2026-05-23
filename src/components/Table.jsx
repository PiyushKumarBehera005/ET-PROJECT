export default function Table({ title }) {
  return (
    <div className="section">
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3].map((id) => (
            <tr key={id}>
              <td>Sample</td>
              <td className="active">Active</td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}