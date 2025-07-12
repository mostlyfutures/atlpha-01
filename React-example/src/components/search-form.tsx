'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Loader2, Search } from 'lucide-react';

const formSchema = z.object({
  query: z.string().min(1, 'Please enter a symbol or name to search.'),
});

interface SearchFormProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function SearchForm({ onSearch, isSearching }: SearchFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch(values.query);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-start">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Search by symbol or name (e.g., AAPL, Bitcoin, Gold)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSearching} className="h-10">
          {isSearching ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Search />
          )}
          <span className="sr-only">Search</span>
        </Button>
      </form>
    </Form>
  );
}
