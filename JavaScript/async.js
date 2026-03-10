  async function hello(){
    let a = console.log('hi there')
    return a;
 }

 let a = await hello()
 console.log(' iam waiting')

 // Async/Await style
async function showDashboard(userId) {
  try {
    const profile = await getUserProfile(userId);
    const orders = await getUserOrders(profile.id);
    const notifications = await getUserNotifications(profile.id);

    console.log("Dashboard ready:", {
      profile,
      orders,
      notifications,
    });
  } catch (error) {
    console.error("Error loading dashboard:", error);
  }
}

showDashboard("12345");

// Help to maindtian code redable and prevent call back hell