import mongoose from 'mongoose';

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/film_finder');
}
