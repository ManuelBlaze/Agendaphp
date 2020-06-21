# Agenda-php
 
 <h1>Proyecto: Agenda de Contactos</h1>
 <p>CRUD dinámico y responsive con conexión a Bd </p>
 <p>Tecnologías utilizadas</p>
 <ul>
  <li>Html5</li>
  <li>Css3</li>
  <li>AJAX</li>
  <li>PHP</li>
  <li>MYSQL</li>
 </ul>
 <br>
 <h3>Estructura de la BD: </h3>
```sql
 CREATE TABLE `contactos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `empresa` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
```sql
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`);
  
ALTER TABLE `contactos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;
```
 
