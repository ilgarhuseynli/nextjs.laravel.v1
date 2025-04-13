'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, PlusIcon, TrashIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z
  .object({
    avatar: z
      .any()
      .optional()
      .refine(
        (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.'
      ),
    first_name: z.string().min(2, {
      message: 'User first name must be at least 2 characters.'
    }),
    last_name: z.string().min(2, {
      message: 'User last name must be at least 2 characters.'
    }),
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Please enter a valid email address.'),
    password: z.string().min(8).optional(),
    password_confirmation: z.string().min(8).optional(),
    is_company: z.boolean().default(false),
    send_notification: z.boolean().default(true),
    type: z.number().int().min(1).max(2).default(2),
    gender: z.number().int().min(1).max(2).default(1),
    birth_date: z.date().optional(),
    phones: z
      .array(
        z.object({
          number: z.string().min(8),
          is_primary: z.boolean().default(false)
        })
      )
      .optional(),
    address_list: z
      .array(
        z.object({
          street: z.string().min(2, 'Street must be at least 2 characters'),
          zip: z.string().optional(),
          city: z.string().min(2, 'City must be at least 2 characters'),
          state: z.string().optional(),
          country: z.string().min(2, 'Country must be at least 2 characters'),
          is_primary: z.boolean().default(false)
        })
      )
      .optional()
  })
  .refine(
    (data) => {
      if (data.password && data.password_confirmation) {
        return data.password === data.password_confirmation;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ['password_confirmation']
    }
  );

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
    password: '',
    password_confirmation: '',
    type: initialData?.type || 2,
    gender: initialData?.gender || 1,
    is_company: initialData?.is_company || false,
    send_notification: initialData?.send_notification || true,
    birth_date: initialData?.birth_date
      ? new Date(initialData.birth_date)
      : undefined,
    phones: initialData?.phones || [
      {
        number: '',
        is_primary: true
      }
    ],
    address_list: initialData?.address_list || [
      {
        street: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        is_primary: true
      }
    ]
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let newValues = {
        ...values,
        birth_date: values.birth_date?.toDateString()
      };
      if (initialData?.id) {
        await USERS_API.update(initialData.id, newValues);
        toast.success('User updated successfully!');
      } else {
        let userRes = await USERS_API.create(newValues);
        toast.success('User added successfully!');
        router.push(APP_ROUTES.dashboard.users.edit(userRes.id));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  }

  const addPhone = () => {
    const currentPhones = form.getValues('phones') || [];
    form.setValue('phones', [
      ...currentPhones,
      {
        number: '',
        is_primary: false
      }
    ]);
  };

  const removePhone = (index: number) => {
    const currentPhones = form.getValues('phones') || [];
    if (currentPhones.length > 1) {
      form.setValue(
        'phones',
        currentPhones.filter((_, i) => i !== index)
      );
    }
  };

  const addAddress = () => {
    const currentAddresses = form.getValues('address_list') || [];
    form.setValue('address_list', [
      ...currentAddresses,
      {
        street: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        is_primary: false
      }
    ]);
  };

  const removeAddress = (index: number) => {
    const currentAddresses = form.getValues('address_list') || [];
    if (currentAddresses.length > 1) {
      form.setValue(
        'address_list',
        currentAddresses.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
      <Form {...form}>
        <Card className='mx-auto w-full'>
          <CardHeader>
            <CardTitle className='text-left text-2xl font-bold'>
              {pageTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name='avatar'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={MAX_FILE_SIZE}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
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
                      <Input placeholder='Enter email address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Gender' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='1'>Male</SelectItem>
                        <SelectItem value='2'>Female</SelectItem>
                        <SelectItem value='3'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='birth_date'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full bg-transparent pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select user type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='1'>Employee</SelectItem>
                        <SelectItem value='2'>Customer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='mt-4 flex'>
              <FormField
                control={form.control}
                name='is_company'
                render={({ field }) => (
                  <FormItem className='mt-5 flex w-full flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Is Company</FormLabel>
                      <FormDescription>
                        Check if this user represents a company
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='send_notification'
                render={({ field }) => (
                  <FormItem className='ms-6 mt-5 flex w-full flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Send Notifications</FormLabel>
                      <FormDescription>
                        Allow the system to send notifications to this user
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {!initialData?.id && (
              <div className='mt-5 grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Enter password'
                          {...field}
                        />
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
                        <Input
                          type='password'
                          placeholder='Confirm password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className='mx-auto w-full'>
          <CardHeader>
            <div className='flex items-center justify-between p-2'>
              <h3 className='text-lg font-bold'>Phones</h3>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addPhone}
              >
                <PlusIcon className='mr-2 h-4 w-4' />
                Add Phone
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Phone Numbers Section */}
            <div className='space-y-4'>
              {form.watch('phones')?.map((_, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <FormField
                    control={form.control}
                    name={`phones.${index}.number`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormControl>
                          <Input placeholder='Enter phone number' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`phones.${index}.is_primary`}
                    render={({ field }) => (
                      <FormItem className='flex h-full flex-row items-start space-x-3 space-y-0 rounded-md border p-2.5'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                          <FormLabel>Default</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  {form.watch('phones')?.length > 1 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      onClick={() => removePhone(index)}
                    >
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='mx-auto w-full'>
          <CardHeader>
            <div className='flex items-center justify-between p-2'>
              <h3 className='text-lg font-bold'>Addresses</h3>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addAddress}
              >
                <PlusIcon className='mr-2 h-4 w-4' />
                Add Address
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <Separator />
              {form.watch('address_list')?.map((_, index) => (
                <div key={index} className='space-y-4 rounded-md border p-4'>
                  <div className='flex items-center justify-between'>
                    <h4 className='font-medium'>Address {index + 1}</h4>
                    {form.watch('address_list')?.length > 1 && (
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() => removeAddress(index)}
                      >
                        <TrashIcon className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name={`address_list.${index}.street`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter street' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`address_list.${index}.city`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter city' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`address_list.${index}.state`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter state' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`address_list.${index}.zip`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter postal code' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`address_list.${index}.country`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter country' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`address_list.${index}.is_primary`}
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-end space-x-3 space-y-0 rounded-md p-2.5'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel>Default Address</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button type='submit' className='w-full'>
          {initialData?.id ? 'Update User' : 'Add User'}
        </Button>

        <br />
        <br />
      </Form>
    </form>
  );
}
