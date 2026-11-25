
using GEPREK71.Models;

namespace GEPREK71.Services.Interfaces
{
    public interface IDestinationAction
    {
        IEnumerable<Destination> Search(
            IEnumerable<Destination> destinations,
            string keyword);

        void SetActive(Destination destination, bool status);
    }
}
