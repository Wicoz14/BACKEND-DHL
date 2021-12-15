var nodemailer = require('nodemailer');
var randomstring = require("randomstring");
const { genSalt, hash } = require("bcryptjs");

async function enviarCorreo(correo){
    const contraseña = randomstring.generate(7);
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dhlcolombia2021@gmail.com',
          pass: process.env.CONTRASENA_CORREO
        }
      });
      
      var mailOptions = {
        from: 'dhlcolombia2021@gmail.com',
        to: correo,
        subject: 'DHL-Colombia: Recuperación de contraseña',
        text: 'Bienvenido a DHL-Colombia, estas a un paso de recuperar la contraseña: tu nueva contraseña es: '+contraseña
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
    nuevaContraseña = await hash(contraseña, salt);
      return nuevaContraseña
}

async function enviarCorreoRegistro(correo){

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dhlcolombia2021@gmail.com',
        pass: process.env.CONTRASENA_CORREO
      }
    });
    
    var mailOptions = {
      from: 'dhlcolombia2021@gmail.com',
      to: correo,
      subject: 'DHL-Colombia: Bienvenidos a DHL, podemos ayudarte...',
      text: 'Bienvenido a DHL-Colombia, ingrese a nuestra página para que envíe y reciba tus paquetes: http://localhost:3000/ '
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

exports.enviarCorreo = enviarCorreo;
exports.enviarCorreoRegistro = enviarCorreoRegistro;