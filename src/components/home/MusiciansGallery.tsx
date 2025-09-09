import tamilMusiciansGroup from '@/assets/tamil-musicians-group.jpg';
import tamilSingerMale from '@/assets/tamil-singer-male.jpg';
import tamilSingerFemale from '@/assets/tamil-singer-female.jpg';

const MusiciansGallery = () => {
  const musicians = [
    {
      id: 1,
      image: tamilMusiciansGroup,
      title: "Carnatic Ensemble",
      description: "Traditional Carnatic music group featuring violin, mridangam, and vocal performers"
    },
    {
      id: 2,
      image: tamilSingerMale,
      title: "Tamil Playback Singer",
      description: "Renowned male vocalist performing contemporary Tamil music"
    },
    {
      id: 3,
      image: tamilSingerFemale,
      title: "Classical Vocalist",
      description: "Elegant Carnatic music performer in traditional attire"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Tamil Musicians
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating the rich musical heritage of Chennai and Tamil Nadu through our talented artists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {musicians.map((musician) => (
            <div 
              key={musician.id}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={musician.image}
                  alt={musician.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {musician.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {musician.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusiciansGallery;