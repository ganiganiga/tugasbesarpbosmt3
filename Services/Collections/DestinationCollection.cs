using TA_sem3.Models;

namespace TA_sem3.Services.Collections
{
    // Abstract class
    public abstract class DestinationCollectionBase
    {
        protected List<Destination> destinations;

        public DestinationCollectionBase(
            IEnumerable<Destination> data)
        {
            destinations = data.ToList();
        }

        // Abstract method
        public abstract IEnumerable<Destination> GetItems();

        // Mengambil seluruh destinasi
        public int GetTotal()
        {
            return destinations.Count;
        }

        // Mengambil destinasi aktif
        public IEnumerable<Destination> GetActive()
        {
            return destinations.Where(d => d.IsActive);
        }
    }

    // Class turunan
    public class DestinationCollection
        : DestinationCollectionBase
    {
        public DestinationCollection(
            IEnumerable<Destination> data)
            : base(data)
        {
        }

        public override IEnumerable<Destination> GetItems()
        {
            return destinations;
        }

        // Filter berdasarkan wilayah
        public IEnumerable<Destination> GetByRegion(
            string region)
        {
            return destinations.Where(d =>
                d.Region.Equals(
                    region,
                    StringComparison.OrdinalIgnoreCase));
        }

        // Mengambil destinasi unggulan
        public IEnumerable<Destination> GetFeatured(int limit)
        {
            return GetActive().Take(limit);
        }

        // Mengurutkan destinasi berdasarkan nama
        public IEnumerable<Destination> SortByName()
        {
            return destinations.OrderBy(d => d.Name);
        }
    }
}
