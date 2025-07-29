import { requireAuth } from '@/lib/auth';

export default async function AccountPage() {
    const user = await requireAuth();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Konto użytkownika</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Informacje o koncie</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data utworzenia</label>
                        <p className="mt-1 text-sm text-gray-900">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pl-PL') : 'Nieznana'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}