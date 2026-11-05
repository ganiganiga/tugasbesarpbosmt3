using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Jelajah.Models;

// Tabel penghubung many-to-many Destination <-> Facility
public class DestinationFacility
{
    public int DestinationId { get; set; }
    public int FacilityId { get; set; }

    [ValidateNever] public Destination Destination { get; set; } = null!;
    [ValidateNever] public Facility Facility { get; set; } = null!;
}
