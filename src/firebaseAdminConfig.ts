import { ServiceAccount } from "firebase-admin";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { z } from "zod";
import { env } from "~/env";


const serviceAccountSchema = z.object({
  type: z.literal("service_account"),
  project_id: z.string(),
  private_key_id: z.string(),
  private_key: z.string(),
  client_email: z.string(),
  client_id: z.string(),
  auth_uri: z.string(),
  token_uri: z.string(),
  auth_provider_x509_cert_url: z.string(),
  client_x509_cert_url: z.string(),
});



const serviceAccount = serviceAccountSchema.parse(
  JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_KEY),
);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount), 
  });
}

const adminDb = getFirestore();

export { adminDb };
