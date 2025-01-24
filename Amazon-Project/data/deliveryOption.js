export const deliveryOption = [
{
  id: '1',
  deliveryDate: 7,
  priceCent: 0,
},
{
  id: '2',
  deliveryDate: 3,
  priceCent: 499,
},
{
  id: '3',
  deliveryDate: 1,
  priceCent: 999,
},
]

export function getDeliveryOption(deliveryOptionId) {
  let matchingDeliveryOption;
  deliveryOption.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingDeliveryOption = option;
    }
  });

  return deliveryOption || deliveryOption[0];
} 