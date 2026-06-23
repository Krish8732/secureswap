import { useState, useEffect, useCallback } from 'react';
import { getExchanges, createExchange, updateExchange, deleteExchange } from '../api/exchangeApi';

export const useExchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExchanges = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getExchanges();
      setExchanges(data || []);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExchanges();
  }, [fetchExchanges]);

  const handleCreate = async (formData) => {
    try {
      const created = await createExchange(formData);
      setExchanges(prev => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await updateExchange(id, updates);
      setExchanges(prev => prev.map(ex => ex.id === id ? updated : ex));
      return updated;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExchange(id);
      setExchanges(prev => prev.filter(ex => ex.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    exchanges,
    loading,
    error,
    refresh: fetchExchanges,
    createExchange: handleCreate,
    updateExchange: handleUpdate,
    deleteExchange: handleDelete
  };
};
