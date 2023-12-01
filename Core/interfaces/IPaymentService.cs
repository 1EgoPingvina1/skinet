using Core.Entities;

namespace Core.interfaces
{
    public interface IPaymentService
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basekt);
        

        
    }
}
