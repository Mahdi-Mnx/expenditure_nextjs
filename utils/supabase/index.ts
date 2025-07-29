// utils/supabase/index.ts

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseBrowser = () => createClientComponentClient();
