// Som en gäst vill jag kunna boka ett rum för att säkerställa min vistelse på hotellet.
// Som en gäst vill jag få en bekräftelse när jag har bokat ett rum för att veta att min bokning har gått igenom.

exports.handler = async (event, context) => {
  console.log('Hello, world!');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, world!' }),
  };
};
