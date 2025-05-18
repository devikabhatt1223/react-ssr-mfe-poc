// import { post } from 'axios';

// const zoneId = process.env.CLOUDFLARE_ZONE_ID;
// const token = process.env.CLOUDFLARE_API_TOKEN;
// const purgeEverything = process.env.PURGE_EVERYTHING === "true";

// async function purge() {
//   if (!zoneId || !token) {
//     console.error("Missing credentials.");
//     // process.exit(1);
//   }

//   const headers = {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   };

//   const payload = purgeEverything
//     ? { purge_everything: true }
//     : { files: ['/index.html'] };

//   try {
//     const response = await post(
//       `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
//       payload,
//       { headers }
//     );

//     if (response.data.success) {
//       console.log("✅ Cache purged.");
//     } else {
//       console.error("❌ Cloudflare error:", response.data.errors);
//       // process.exit(1);
//     }
//   } catch (err) {
//     console.error("❌ Request failed:", err.message);
//     // process.exit(1);
//   }
// }

// purge();
