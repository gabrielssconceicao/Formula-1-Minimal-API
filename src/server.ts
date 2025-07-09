import fastify from 'fastify';
import cors from '@fastify/cors';

const teams = [
  { id: 1, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 2, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 3, name: "Ferrari", base: "Maranello, Italy" },
  { id: 4, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 6, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 7, name: "Williams", base: "Grove, United Kingdom" },
  { id: 8, name: "Visa Cash App RB", base: "Faenza, Italy" },   // Antiga AlphaTauri
  { id: 9, name: "Stake F1 Team Kick Sauber", base: "Hinwil, Switzerland" },  // Antiga Alfa Romeo
  { id: 10, name: "Haas", base: "Kannapolis, United States" }
];


const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Sergio Perez", team: "Red Bull Racing" },
  { id: 3, name: "Charles Leclerc", team: "Ferrari" },
  { id: 4, name: "Carlos Sainz", team: "Ferrari" },
  { id: 5, name: "Lewis Hamilton", team: "Mercedes" },
  { id: 6, name: "George Russell", team: "Mercedes" },
  { id: 7, name: "Lando Norris", team: "McLaren" },
  { id: 8, name: "Oscar Piastri", team: "McLaren" },
  { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 10, name: "Lance Stroll", team: "Aston Martin" },
  { id: 11, name: "Pierre Gasly", team: "Alpine" },
  { id: 12, name: "Esteban Ocon", team: "Alpine" },
  { id: 13, name: "Alex Albon", team: "Williams" },
  { id: 14, name: "Logan Sargeant", team: "Williams" },
  { id: 15, name: "Yuki Tsunoda", team: "Visa Cash App RB" },
  { id: 16, name: "Daniel Ricciardo", team: "Visa Cash App RB" },
  { id: 17, name: "Valtteri Bottas", team: "Stake F1 Team Kick Sauber" },
  { id: 18, name: "Zhou Guanyu", team: "Stake F1 Team Kick Sauber" },
  { id: 19, name: "Kevin Magnussen", team: "Haas" },
  { id: 20, name: "Nico Hülkenberg", team: "Haas" }
];


const server = fastify({logger: true});
server.register(cors,{
  origin: '*'}
)
server.get('/teams', (req, res) => {
  res.type('application/json')
  .code(200)
  
  return teams
})

server.get('/drivers', (req, res) => {
  res.type('application/json')
  .code(200)
  
  return drivers
})

interface DriverParams {
  id: string
}
server.get<{Params: DriverParams}>('/drivers/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.type('application/json')
  .code(200)
  
  const driver = drivers.find(d => d.id === id)
  res.type('application/json')
  if(!driver) {
    res
    .code(404)
    return {message: "Driver not found"}
  }
  
  res.code(200)
  return {driver}
})

server.listen({
  port: 3333
},()=>{
  console.log('HTTP server running on http://localhost:3333')
})