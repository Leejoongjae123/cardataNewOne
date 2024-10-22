import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import {createClient} from '@/utils/supabase/server'
import { create } from "lodash";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    
    // New condition: Redirect to /sign-in if accessing the root path
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    
    const user = await supabase.auth.getUser();
    
    let userRole = null;
    let certificated=null
    if (!user.error) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.data.user.id)
        .single();
      
      if (!error && data) {
        userRole = data.role;
        certificated=data.certificated
      }
    }
if (request.nextUrl.pathname.startsWith("/list")) {
  if (user.error) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (!certificated) {
    return NextResponse.redirect(new URL("/authority", request.url));
  }
  // 여기서 추가 검사나 로직을 수행할 수 있습니다.
  // 예: 특정 ID에 대한 접근 권한 확인 등
}

    // else if (request.nextUrl.pathname === "/" && !user.error && userRole==='master') {
    //   return NextResponse.redirect(new URL("/list", request.url));
    // }


    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
