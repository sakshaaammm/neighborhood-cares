import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ReportFormValues = {
  title: string;
  description: string;
  media?: string;
};

export default function Report() {
  const navigate = useNavigate();
  const form = useForm<ReportFormValues>();

  const onSubmit = (data: ReportFormValues) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your backend
    toast.success("Report submitted successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-lg mx-auto p-4">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Report Issue</h1>
          <p className="text-muted-foreground">Help improve your neighborhood</p>
        </header>
        
        <Card className="glass-card p-6 rounded-lg animate-scale-in">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter a clear title for your report" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Keep it short and descriptive
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide detailed information about the issue"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include relevant details that will help address the issue
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="media"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Here you would typically upload the file and get a URL
                            // For now, we'll just store the file name
                            field.onChange(file.name);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload photos or videos related to the issue
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full hover-scale"
              >
                Submit Report
              </Button>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  );
}