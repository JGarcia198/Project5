export default function TableBody({ linkData, removeLink }) {
    return (
      <tbody>
        {linkData.map((link, index) => (
          <tr key={`${link.name}-${index}`}>
            <td>{link.name}</td>
            <td>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.url}
              </a>
            </td>
            <td>
              <button className="btnDanger" onClick={() => removeLink(index)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  