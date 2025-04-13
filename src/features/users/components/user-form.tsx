'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { User } from '@/types/user-types';
import USERS_API from '@/features/users/api/users';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/config/routes';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  // avatar: z
  //   .any()
  //   // .refine((files) => files?.length == 1, 'Image is required.')
  //   // .refine(
  //   //   (files) => files?.[0]?.size >= MAX_FILE_SIZE,
  //   //   `Max file size is 5MB.`
  //   // )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     '.jpg, .jpeg, .png and .webp files are accepted.'
  //   ),
  first_name: z.string().min(2, {
    message: 'User first name must be at least 2 characters.'
  }),
  last_name: z.string().min(2, {
    message: 'User last name must be at least 2 characters.'
  }),
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Please enter a valid email address.'),
  phone: z.string().min(8).optional().or(z.literal('')),
  password: z.string().min(8),
  password_confirmation: z.string().min(8)
});

export default function UserForm({
  initialData,
  pageTitle
}: {
  initialData: User | null;
  pageTitle: string;
}) {
  const router = useRouter();

  const defaultValues = {
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    password: '',
    password_confirmation: '',
    type: 2
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let userRes = await USERS_API.create(values);
      toast.success('Added successfully!');

      router.push(APP_ROUTES.dashboard.users.edit(userRes.id));
    } catch (error) {
      // toast.error('Invalid credentials');
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/*<FormField*/}
            {/*  control={form.control}*/}
            {/*  name='avatar'*/}
            {/*  render={({ field }) => (*/}
            {/*    <div className='space-y-6'>*/}
            {/*      <FormItem className='w-full'>*/}
            {/*        <FormLabel>Avatar</FormLabel>*/}
            {/*        <FormControl>*/}
            {/*          <FileUploader*/}
            {/*            value={field.value}*/}
            {/*            onValueChange={field.onChange}*/}
            {/*            maxFiles={1}*/}
            {/*            maxSize={1024 * 1024}*/}
            {/*            // disabled={loading}*/}
            {/*            // progresses={progresses}*/}
            {/*            // pass the onUpload function here for direct upload*/}
            {/*            // onUpload={uploadFiles}*/}
            {/*            // disabled={isUploading}*/}
            {/*          />*/}
            {/*        </FormControl>*/}
            {/*        <FormMessage />*/}
            {/*      </FormItem>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*/>*/}

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fist Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter first name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter last name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Email address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter phone' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password_confirmation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder='Confirm password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit'>Add User</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
