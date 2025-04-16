'use client';

import { useFormStatus } from 'react-dom';
import global from '@/modules/global.module.css'

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="px-4 py-2 bg-violet-500 text-white rounded  cursor-pointer" disabled={pending}>
      {pending ? 'Enviando...' : 'Confirmar'}
    </button>
  );
}
