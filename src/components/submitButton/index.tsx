'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="px-4 py-2 bg-violet-500 text-white rounded  cursor-pointer" disabled={pending}>
      {pending ? 'Enviando...' : 'Confirmar'}
    </button>
  );
}
