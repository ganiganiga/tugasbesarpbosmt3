
using GEPREK71.Models;

namespace GEPREK71.Services.Base
{
    public abstract class ContentActionBase
    {
        // Method yang diwariskan class turunan
        protected bool IsValidKeyword(string keyword)
        {
            return !string.IsNullOrWhiteSpace(keyword);
        }

        // Abstract method wajib diimplementasikan
        public abstract IEnumerable<Destination> Execute(
            IEnumerable<Destination> destinations,
            string keyword);
    }
}
