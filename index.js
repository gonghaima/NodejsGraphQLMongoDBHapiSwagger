const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');



const server = hapi.server({
  port: 4000,
  host: 'localhost'
});

mongoose.connect('mongodb://whoisyourdaddy:whoisyourdaddy1@ds119171.mlab.com:19171/hapigraphql');
mongoose.connection.once('open', ()=>{
  console.log('connected to dastabase');
});
const init = async()=>{
  server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return `<h1>My modern api</h1>`;
    }
  },
  {
    method: 'GET',
    path: '/api/v1/paintings',
    handler: function (request, reply) {
      return Painting.find();
    }
  },
  {
    method: 'POST',
    path: '/api/v1/paintings',
    handler: function (request, reply) {
      const {name, url, techniques} = request.payload;
      const painting = new Painting({
        name,
        url,
        techniques
      });
      return painting.save();
    }
  }]);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

init();