import { NavLink } from 'react-router-dom';

export default function Encabezado() {
  return (
    <header className="encabezado-app mb-4">
      <div className="encabezado-capa">
        <div className="encabezado-top">
          <p className="encabezado-etiqueta mb-1">Catalogo</p>
          <h1 className="encabezado-titulo mb-0">Series</h1>
        </div>
        <nav>
          <ul className="nav nav-pills nav-fill gap-2 p-2 encabezado-nav" id="pillNav">
            <li className="nav-item">
              <NavLink
                to="/temporadas/mostrar"
                className={({ isActive }) =>
                  isActive ? "nav-link rounded-pill active" : "nav-link rounded-pill"
                }
              >
                Ver temporadas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/temporadas/nuevo"
                className={({ isActive }) =>
                  isActive ? "nav-link rounded-pill active" : "nav-link rounded-pill"
                }
              >
                Nueva temporada
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
