import type { PatchError } from '@/types'

export const PATCH_ERRORS: PatchError[] = [
  {
    code: '401',
    label: '401: Communication timeout',
    description: 'I went quiet when I should have spoken.',
    response: `I know I went quiet when you needed me to show up.
That's on me, no excuses, no deflection.

You're direct enough to tell me when something's wrong, 
and you deserve someone who meets that with honesty.

I hear you. I'm here. I'm not going anywhere.`,
  },
  {
    code: '404',
    label: '404: Attention not found',
    description: 'You looked for me and I wasn\'t present.',
    response: `You gave me your attention and I dropped mine somewhere else.
That's not okay, you notice everything, which means you noticed that.

I see you. I'm back.
And I promise to be more present, not just when it's convenient.`,
  },
  {
    code: '503',
    label: '503: Emotional service unavailable',
    description: 'I wasn\'t there when you needed support.',
    response: `You came to me and I wasn't available the way you needed.

You carry a lot, you're patient with everyone including me.
That patience isn't infinite, and I shouldn't test it.

I'm sorry. Let me actually show up this time.`,
  },
  {
    code: 'custom',
    label: 'Custom: Write your own',
    description: 'Something specific that needs addressing.',
    response: `Whatever it is I'm listening.
No defensiveness, no pivoting, no making it about me.

Just talk to me. I'm here.`,
  },
]