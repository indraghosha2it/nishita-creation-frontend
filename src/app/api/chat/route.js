// // // frontend/app/api/chat/route.js

// // import { NextResponse } from 'next/server';

// // const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// // export async function POST(request) {
// //   try {
// //     const body = await request.json();
// //     const { message, sessionId } = body;

// //     if (!message) {
// //       return NextResponse.json(
// //         { success: false, error: 'Message is required' },
// //         { status: 400 }
// //       );
// //     }

// //     // Forward to backend
// //     const response = await fetch(`${BACKEND_URL}/api/chat/message`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ message, sessionId }),
// //       cache: 'no-store'
// //     });

// //     const data = await response.json();

// //     return NextResponse.json(data, { status: response.status });

// //   } catch (error) {
// //     console.error('Chat API error:', error);
// //     return NextResponse.json(
// //       { 
// //         success: false, 
// //         error: 'Failed to process chat message',
// //         fallback: "🌸 I'm having trouble connecting. Please contact support@beautybucket.com."
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function DELETE(request) {
// //   try {
// //     const url = new URL(request.url);
// //     const sessionId = url.searchParams.get('sessionId');

// //     if (!sessionId) {
// //       return NextResponse.json(
// //         { success: false, error: 'Session ID is required' },
// //         { status: 400 }
// //       );
// //     }

// //     const response = await fetch(`${BACKEND_URL}/api/chat/session/${sessionId}`, {
// //       method: 'DELETE',
// //       cache: 'no-store'
// //     });

// //     const data = await response.json();
// //     return NextResponse.json(data, { status: response.status });

// //   } catch (error) {
// //     console.error('Clear session error:', error);
// //     return NextResponse.json(
// //       { success: false, error: 'Failed to clear session' },
// //       { status: 500 }
// //     );
// //   }
// // }


// // frontend/app/api/chat/route.js

// import { NextResponse } from 'next/server';

// const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { message, sessionId } = body;

//     if (!message) {
//       return NextResponse.json(
//         { success: false, error: 'Message is required' },
//         { status: 400 }
//       );
//     }

//     // If backend is not available, return a fallback response
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/chat/message`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message, sessionId }),
//         cache: 'no-store'
//       });

//       const data = await response.json();
//       return NextResponse.json(data, { status: response.status });
//     } catch (backendError) {
//       console.error('Backend unavailable, using fallback:', backendError);
      
//       // Fallback responses for common questions
//       const fallbacks = {
//         'return': "🔄 **Return Policy:**\n\n• 30-day return window\n• Products must be unused in original packaging\n• Free returns for defective/wrong items\n• Contact support@beautybucket.com\n• Refunds in 5-7 business days",
//         'shipping': "🚚 **Shipping Information:**\n\n• Dhaka: 2-5 business days\n• Other cities: 3-7 business days\n• Free shipping over 3000 BDT\n• Tracking number provided\n• COD available nationwide",
//         'payment': "💳 **Payment Methods:**\n\n• Cash on Delivery (COD)\n• bKash, Nagad, Rocket\n• Credit/Debit Cards\n\nAll transactions are secure!",
//         'authentic': "✅ **100% AUTHENTIC!**\n\n• Sourced from brands or authorized distributors\n• Every product verified for authenticity\n• No counterfeit products - EVER!",
//         'contact': "📞 **Contact Us:**\n\n• Email: support@beautybucket.com\n• Phone: +880 1XXXXXXX\n• Hours: 10 AM - 10 PM (7 days)\n• Social: @beautybucket.bd"
//       };

//       let fallbackMessage = "🌸 Welcome to Beauty Bucket! I'm your beauty assistant. How can I help you today? 💕";
      
//       const lowerMessage = message.toLowerCase();
//       if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
//         fallbackMessage = fallbacks.return;
//       } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
//         fallbackMessage = fallbacks.shipping;
//       } else if (lowerMessage.includes('payment') || lowerMessage.includes('bkash') || lowerMessage.includes('cod')) {
//         fallbackMessage = fallbacks.payment;
//       } else if (lowerMessage.includes('authentic') || lowerMessage.includes('real') || lowerMessage.includes('fake')) {
//         fallbackMessage = fallbacks.authentic;
//       } else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
//         fallbackMessage = fallbacks.contact;
//       } else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
//         fallbackMessage = "🌸 Hello beautiful! Welcome to Beauty Bucket! I'm your virtual beauty assistant. How can I help you today? 💕";
//       }

//       return NextResponse.json({
//         success: true,
//         data: {
//           message: fallbackMessage,
//           sessionId: sessionId || `session_${Date.now()}`,
//           isFallback: true
//         }
//       });
//     }

//   } catch (error) {
//     console.error('Chat API error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'Failed to process chat message',
//         fallback: "🌸 I'm having trouble connecting. Please contact support@beautybucket.com."
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     const url = new URL(request.url);
//     const sessionId = url.searchParams.get('sessionId');

//     if (!sessionId) {
//       return NextResponse.json(
//         { success: false, error: 'Session ID is required' },
//         { status: 400 }
//       );
//     }

//     // Try to clear on backend
//     try {
//       await fetch(`${BACKEND_URL}/api/chat/session/${sessionId}`, {
//         method: 'DELETE',
//         cache: 'no-store'
//       });
//     } catch (e) {
//       // Backend unavailable, just return success
//     }

//     return NextResponse.json({ success: true });

//   } catch (error) {
//     console.error('Clear session error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to clear session' },
//       { status: 500 }
//     );
//   }
// }

// frontend/app/api/chat/route.js

import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // ✅ Forward to conversation endpoint
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/conversation/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, sessionId }),
        cache: 'no-store'
      });

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (backendError) {
      console.error('Backend unavailable, using fallback:', backendError);
      
      // Fallback responses
      const fallbackMessage = "🌸 Welcome to Beauty Bucket! I'm your beauty assistant. How can I help you today? 💕";
      return NextResponse.json({
        success: true,
        data: {
          message: fallbackMessage,
          sessionId: sessionId || `session_${Date.now()}`,
          isFallback: true
        }
      });
    }

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process chat message',
        fallback: "🌸 I'm having trouble connecting. Please contact support@beautybucket.com."
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // ✅ Forward to conversation endpoint
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/conversation/session`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
        cache: 'no-store'
      });

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (e) {
      return NextResponse.json({ success: true });
    }

  } catch (error) {
    console.error('Clear session error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear session' },
      { status: 500 }
    );
  }
}