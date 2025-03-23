import { Message } from './Message';

export const MESSAGES: Message[] = [
    {
        id: 1,
        from: 'Judy Crawford, NP-C',
        date: 'Mar 5, 2025 10:42 AM',
        subject: 'Post-Visit Summary',
        body: "Thanks for meeting with us earlier this week. I've attached a summary of our discussion, including the plan to run a few routine labs. No immediate concerns based on your visit, but we'll know more once the test results are in.",
        isRead: true
    },
    {
        id: 2,
        from: 'Judy Crawford, NP-C',
        date: 'Mar 10, 2025 3:16 PM',
        subject: 'Lab Work Confirmed',
        body: "Just a quick note to confirm that your lab samples were received and are being processed. Results typically come back within a few days — we'll reach out as soon as they're reviewed.",
        isRead: true
    },
    {
        id: 3,
        from: 'Judy Crawford, NP-C',
        date: 'Mar 13, 2025 9:08 AM',
        subject: 'Follow-up Needed: Lab Results',
        body: "Your recent lab results showed one value slightly outside the normal range. It's nothing urgent, but I'd like to discuss it with you to make sure we're on top of things. Please send a message or schedule a visit when you're able.",
        isRead: false
    },
    {
        id: 4,
        from: 'Judy Crawford, NP-C',
        date: 'Mar 18, 2025 1:27 PM',
        subject: 'Reminder: Check-in Recommended',
        body: "Just a quick reminder to check in regarding your recent lab results. We're happy to talk virtually or in person, whichever is easier for you. Catching trends early is key!",
        isRead: false
    },
    {
        id: 5,
        from: 'Judy Crawford, NP-C',
        date: 'Mar 21, 2025 4:51 PM',
        subject: 'Still Here to Follow Up',
        body: "We haven't heard back about your follow-up yet, and just wanted to make sure everything's okay. We're here when you're ready — even a quick message is fine. Let us know how you'd like to proceed.",
        isRead: false
    },
];