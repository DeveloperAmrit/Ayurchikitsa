// Server action
export async function subscribeUser(formData: FormData) {
  const email = formData.get('email');
  // Add your email subscription logic here
  console.log(email);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
}
